import Image from "next/image";

const Logo = () => {
  return (
    <Image
      loading="eager"
      height={130}
      width={130}
      alt="logo"
      src="/logo.svg"
    />
  );
};

export default Logo;
