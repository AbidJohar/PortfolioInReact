import { UserData } from "../data/UserData";

function Contact() {
  const { FooterLink } = UserData;
  return (
    <div className="mb-20  lg:mt-60 pt-20  h-fit  flex w-full items-center justify-center md:h-fit lg:mb-4">
      <div className="flex flex-col items-center justify-center ">
        <h2 className="pb-6 pt-12 mt-14 text-center text-3xl tracking-wider text-white lg:text-5xl">
          Get In Touch
        </h2>
        <p className="font-poppins mx-auto px-2 pb-6 text-center text-sm tracking-wider text-white lg:w-[50%]">
          I'd love to connect and explore exciting opportunities with you!
          Whether you have interesting projects, creative ideas, or just want to
          chat, please don't hesitate to reach out. My inbox is open 24/7!
        </p>

        <button
          onClick={() => {
            window.open(FooterLink);
          }}
          className="h-[50px] w-[200px] border-2 border-white bg-transparent hover:bg-white hover:bg-opacity-40"
        >
          Connect Now 🚀
        </button>
      </div>
    </div>
  );
}

export default Contact;
