"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Register } from "@/app/actions/register";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { register } from "module";

const formSchema = z
  .object({
    name:z.string().min(3 , {message:"name must be at least 3 characters"}),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    role: z.enum(["employer", "jobseeker"]),
    companyName: z.string({message:"company name must be atleast 3 character"}),
    description: z.string(),
    website: z.string().url().optional(),
    logoUrl: z.string().url().optional(),
  })
  .refine(
    (data) => {
      if (data.role === "employer") {
        return !!data.companyName && !!data.description;
      }
      return true;
    },
    {
      message: "Company Name and Description are required for employers.",
      path: ["companyName"],
    }
  );

const SignupDialog = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password , setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      password: "",
      email: "",
      role: "jobseeker",
      companyName: "", 
      description: "",
    },
  });

  async function onSubmit (values: z.infer<typeof formSchema>){
    setIsLoading(true);
    try{
      const res = await Register(values) 
      if(res.type === 'success'){
        const login = await signIn("credentials" , {
          email:res.email,
          password : password,
          redirect : false
        })
        if(login){
          toast.success(res.message)
          setOpen(false)
          form.reset()
        }else{
          toast.error("Registration succeeded, but login failed.")
        }
      }else{
        toast.error(res.message)
      }
    }
    catch{
      toast.error("somthing went wrong with registeration")
    }
    finally{
      setIsLoading(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">SignUp</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>}
        <DialogHeader>
          <DialogTitle>SignUp</DialogTitle>
          <DialogDescription>please enter your details</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employer">Employer</SelectItem>
                        <SelectItem value="jobseeker">Jobseeker</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 
             {form.watch("role") === "employer" && (
              <section>
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
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
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>websiteUrl</FormLabel>
                      <FormControl>
                        <Input type="url" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>logoUrl</FormLabel>
                      <FormControl>
                        <Input type="url" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </section>
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        onChange={(e)=>{field.onChange(e);
                           setPassword(e.target.value)
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute right-0 top-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Eye /> : <EyeOff />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">SignUp</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
