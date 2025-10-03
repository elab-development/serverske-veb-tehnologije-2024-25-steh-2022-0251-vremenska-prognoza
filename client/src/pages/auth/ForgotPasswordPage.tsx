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
import { requestOtp } from "@/lib/api/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { ForgotPasswordSchema } from "./contact-schema";

const ForgotPasswordPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    setIsLoading(true);
    try {
      await requestOtp(values.email);
      toast({ title: "OTP sent!", description: "Check your email inbox." });
      console.log(values.email);
      navigate("/verify-otp", { state: { email: values.email } });
    } catch (error) {
      toast({ title: "Error", description: "Failed to send OTP." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto mb-20 mt-40 flex items-center justify-center">
      <div className="flex flex-col rounded-lg sm:border sm:px-8 sm:py-12">
        <h1 className="text-3xl font-semibold">Forgot Password</h1>
        <p className="mt-2 text-base text-foreground/70">
          Enter your email to reset your password.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 flex w-full max-w-[400px] flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        </Form>
        <Toaster />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
