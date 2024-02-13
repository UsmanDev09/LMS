// import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <div className="text-sky-700 text-3xl">
      <h1>This is a Home Page</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
