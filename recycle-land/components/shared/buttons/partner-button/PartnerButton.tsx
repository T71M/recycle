"use client";
import { Button } from "@nextui-org/react";
import { FC, useState } from "react";
import { BecomePartnerModal } from "../../modals/BecomePartnerModal";
import { toast } from "react-toastify";

export const PartnerButton: FC = () => {
  const [open, setIsOpen] = useState(false);
  return (
    <>
      <Button
        radius="md"
        variant="ghost"
        onClick={() => setIsOpen(true)}
        className="!text-white"
      >
        Разместить пункт приема
      </Button>
      <BecomePartnerModal isOpen={open} onOpenChange={setIsOpen} />
    </>
  );
};
