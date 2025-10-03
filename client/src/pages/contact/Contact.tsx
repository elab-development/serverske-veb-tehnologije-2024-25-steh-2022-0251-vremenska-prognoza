import ContactForm from "./_components/ContactForm";

const Contact = () => {
  return (
    <div className="container mx-auto mb-20 mt-40 flex flex-col gap-8 lg:flex-row lg:gap-20 xl:gap-24 2xl:gap-32">
      <div className="flex w-full flex-col gap-4 md:w-2/3 lg:w-full">
        <h1 className="text-5xl font-semibold">Contact us</h1>
        <p className="text-lg">
          We're here to help with any questions or feedback you have.
        </p>
        <ContactForm />
      </div>
      <div className="w-full">
        <img
          className="h-full rounded-lg object-cover object-top"
          src="./contact-image.jpg"
          alt="contact-image"
        />
      </div>
    </div>
  );
};

export default Contact;
