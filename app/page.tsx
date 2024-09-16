
import Image from "next/image";
import Link from "next/link";
import PatientForm from "@/components/forms/PatientForm";
import PassKeyModal from "@/components/PassKeyModal";

export default function Home({ searchParams } : SearchParamProps) {

  const isAdmin = searchParams?.admin === 'true';

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PassKeyModal />}
      {/* TODO: OTP Verification Pass Key Modal */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <div className="flex flex-row">
          <Image 
            src="/assets/icons/logo-icon.webp"
            height={1000}
            width={1000}
            alt="Patient"
            className="mb-12 h-[2.5rem] w-fit rounded-[5px] border border-blue-500"
            />
            <h1 className="font-bold text-3xl ml-2">Medi Flow</h1>
          </div>
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 MediFlow
            </p>
            <Link href="/?admin=true" className="text-blue-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image 
        src="/assets/images/onboarding-img.webp"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
