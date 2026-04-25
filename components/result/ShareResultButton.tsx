"use client";

import { useState } from "react";
import { buildResultCopy } from "../../lib/result/buildResultCopy";
import type { ResultModel } from "../../lib/result/types";
import { Button } from "../ui/Button";
import { LocalIcon } from "../ui/LocalIcon";

export function ShareResultButton({ result }: { result: ResultModel }) {
  const [copied, setCopied] = useState(false);

  async function copyResult() {
    const text = buildResultCopy(result);

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <Button onClick={copyResult} type="button" variant="secondary">
      <LocalIcon className="h-4 w-4" name="share" />
      {copied ? "Copied" : "Copy shareable result"}
    </Button>
  );
}

