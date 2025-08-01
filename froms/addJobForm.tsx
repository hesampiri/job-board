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
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Job, JobTag, Tag } from "@prisma/client";
import { UpdateJob } from "@/app/actions/updateJob";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  location: z.string({
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

type TagType = {
  id: string;
  jobId: string;
  tagId: string;
  tag: Tag;
};

type fromProp = {
  currentJob?: {
    id: string;
    title: string;
    description: string;
    location: string;
    type: "full_time" | "part_time" | "contract";
    category:
      | "software_development"
      | "design"
      | "marketing"
      | "sales"
      | "hr"
      | "finance"
      | "other";
    salary: number;
    tags: TagType[];
  };
  type: string;
};

const AddJobForm = ({ currentJob, type }: fromProp) => {
  const defaultValue = {
    title: "",
    description: "",
    location: "onsite",
    type: "full_time",
    category: "software_development",
    tags: [],
  };

  const { data: session, status } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: currentJob?.title ?? "",
      description: currentJob?.description ?? "",
      salary: currentJob?.salary! ?? "",
      location: currentJob?.location ?? "remote",
      type: currentJob?.type ?? "full_time",
      category: currentJob?.category ?? "software_development",
      tags: currentJob?.tags.map((t) => t.tag.name) ?? [],
    },
  });
  const watchedValues = useWatch({ control: form.control });

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
    console.log("clickde in form");

    if (type === "add") {
      const companyId = session?.user.companyId;
      const job = await AddJob(values);
      if (job.type === "success") {
        form.reset();
        toast.success(job.message);
        redirect("/dashboard/employer");
      } else {
        toast.error(job.message);
      }
    } else {
      const updated = await UpdateJob(values, currentJob?.id as string);
      if (updated.message === "success") {
        toast.success(updated.message);
      } else {
        toast.error(updated.message);
      }
    }
  };

  // console.log("Watched:", watchedValues);

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
              <FormItem className="text-sm">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={10} />
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
                    type="number"
                    value={field.value.toString()}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-10">
            {type === "add" ? "Add job" : "Edit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddJobForm;
