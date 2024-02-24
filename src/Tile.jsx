import { motion } from "framer-motion";
export function Tile({ content: Content, flip, state }) {
  const containerVariants = {
    start: { rotateY: 0, perspective: 500 },
    flipped: { rotateY: 180, perspective: 500 },
    matched: { rotateY: 180, perspective: 500 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="start"
      transition={{
        duration: 0.5,
      }}
      animate={state}
      className={"inline-block size-full relative flip custom-cursor-pointer"}
    >
      {state !== "matched" && (
        <Back
          className={`flex size-full bg-primaryClrTwo rounded-lg z-20 dark:bg-slate-900 absolute`}
          flip={flip}
          style={{
            backfaceVisibility: "hidden",
          }}
        />
      )}
      {state !== "matched" && (
        <Front
          className={`size-full bg-accentClrOne rounded-lg flex items-center justify-center dark:bg-black/40 absolute ${
            state === "flipped" && "dark:custom-shadow"
          }`}
        >
          <Content
            style={{
              width: "80%",
              height: "80%",
              position: "absolute",
            }}
            className="text-white dark:text-accentClrOne"
          />
        </Front>
      )}
      {state === "matched" && (
        <Matched className="size-full flex items-center justify-center relative">
          <Content
            style={{
              width: "80%",
              height: "80%",
              position: "absolute",
              color: "#c7d2ff",
            }}
            className={"dark:opacity-50"}
          />
        </Matched>
      )}
    </motion.div>
  );
}

function Back({ className, flip }) {
  return (
    <div
      onClick={flip}
      className={className}
      style={{
        backfaceVisibility: "hidden",
      }}
    ></div>
  );
}

function Front({ className, children }) {
  return <div className={className}>{children}</div>;
}

function Matched({ className, children }) {
  return <div className={className}>{children}</div>;
}
