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
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/hooks/useAuth";
import { ToastClass } from "@/models/toast-class";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { SignUpSchema } from "./contact-schema";

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signup } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    setIsLoading(true);
    try {
      await signup(values.name, values.email, values.password);
      form.reset();
      toast(
        ToastClass.create().setTitle(
          "Your account has been created successfully.",
        ),
      );
      navigate("/log-in");
    } catch (error) {
      toast(
        ToastClass.create()
          .setTitle("Registration failed!")
          .setDescription(
            "An error occurred during registration. Please try again.",
          ),
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto mb-20 mt-40 flex items-center justify-center">
      <div className="flex flex-col rounded-lg sm:border sm:px-8 sm:py-12">
        <h1 className="text-3xl font-semibold">Sign Up</h1>
        <p className="mt-2 text-base text-foreground/70">
          Stay ahead of the storm with personalized weather alerts.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 flex w-full max-w-[600px] flex-col"
          >
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-[6px]">
                    <FormLabel className="text-sm font-medium">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6"
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-[6px]">
                    <FormLabel className="text-sm font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-[6px]">
                    <FormLabel className="text-sm font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="py-6"
                        placeholder="At least 8 characters"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="mt-6 py-6"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
            <div className="my-6 flex w-full items-center text-center text-accent dark:text-foreground/50">
              <div className="flex-1 border-b border-input"></div>
              <p className="mx-2 text-sm">Or</p>
              <div className="flex-1 border-b border-input"></div>
            </div>

            <p className="flex items-center justify-center gap-1">
              Already have an account?
              <Link
                to="/log-in"
                className="text-primary dark:text-white dark:underline"
              >
                Log In
              </Link>
            </p>

            <Toaster />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
