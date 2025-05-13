'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { z } from 'zod' 
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  role: z.enum(["employer", "jobseeker"], {
    message: "Role must be either employer or jobseeker.",
  }),
})

const SignupDialog = () => {

  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      role: "jobseeker",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="default">SignUp</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>SignUp</DialogTitle>
        <DialogDescription>
          please enter your details
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField control={form.control} name="username" render={({field})=>(
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>

            <FormField control={form.control} name="email" render={({field})=>(
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
            <FormField control={form.control} name="password" render={({field})=>(
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input {...field} type={showPassword ? "text" : "password"} />
                        <Button type='button' variant='ghost' className='absolute right-0 top-0' onClick={()=>setShowPassword(!showPassword)}>
                          {showPassword ? <Eye /> : <EyeOff />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
            <FormField control={form.control} name='role' render={({field})=>(
                <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="employer">Employer</SelectItem>
                                <SelectItem value="jobseeker">Jobseeker</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
            <DialogFooter>
              <Button type="submit">SignUp</Button>
            </DialogFooter>
        </form>

      </Form>
    </DialogContent>
  </Dialog>
  )
}

export default SignupDialog