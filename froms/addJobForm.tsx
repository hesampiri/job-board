"use client";
import { Button } from "@/components/ui/button";
import { AddJob } from "@/app/actions/addJob";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  location: z.enum(["remote", "hybrid", "onsite"], {
    message: "Location is required",
  }),
  type: z.enum(["full_time", "part_time", "contract"], {
    message: "Type is required",
  }),
  category: z.enum([
    "software_development",
    "design",
    "marketing",
    "sales",
    "hr",
    "finance",
    "other",
  ]),
  tags: z.array(z.string()),
  salary: z.number().min(1, {
    message: "Salary is required",
  }),
});

const AddJobForm = () => {
  const { data: session, status } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "onsite",
      type: "full_time",
      category: "software_development",
      // salary:0,
      tags: [],
    },
  });

  const tags = [
    "frontend",
    "backend",
    "fullstack",
    "devops",
    "uiux",
    "data-science",
    "machine-learning",
    "cybersecurity",
  ];

  if (status === "loading") return null;

  const user = session?.user;
  if (user && user.role !== "employer") {
    redirect("/unauthorized");
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const companyId = session?.user.companyId;
    const finalValues = { ...values, companyId };
    const job = await AddJob(values);
    if (job.type === "success") {
      form.reset()
      toast.success(job.message);
    } else {
      toast.error(job.message);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">Onsite</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_time">Full-time</SelectItem>
                      <SelectItem value="part_time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software_development">
                        Software Development
                      </SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormLabel>Tags</FormLabel>
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                {tags.map((item) => (
                  <div key={item}>
                    <Checkbox
                      checked={field.value.includes(item)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, item])
                          : field.onChange(
                              field.value.filter((value) => value !== item)
                            );
                      }}
                    />
                    <FormLabel className="capitalize px-2">{item}</FormLabel>
                  </div>
                ))}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-10">
            Add Job
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddJobForm;
