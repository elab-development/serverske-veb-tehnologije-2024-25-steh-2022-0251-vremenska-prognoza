import { useToast } from "@/components/ui/use-toast";
import { ToastClass } from "@/models/toast-class";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthForm, { ContactSchema } from "./_components/AuthForm";

const SignUp = () => {
  const { toast } = useToast();
  const orOption = {
    text: "Already have an account? ",
    href: "/log-in",
  };
  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit() {
    form.reset();
    toast(
      ToastClass.create()
        .setTitle("You have successfully signed!")
        .setDescription("We will get back to you soon."),
    );
  }

  return (
    <div className="container mx-auto mb-20 mt-40 flex items-center justify-center">
      <div className="flex flex-col rounded-lg border px-8 py-12">
        <h1 className="text-3xl font-semibold">Sign Up</h1>
        <p className="mt-2 text-base text-foreground/70">
          Stay ahead of the storm with personalized weather alerts.
        </p>
        <AuthForm
          form={form}
          onSubmit={onSubmit}
          btnText="Sign Up"
          orOption={orOption}
        />
      </div>
    </div>
  );
};

export default SignUp;
