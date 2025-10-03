const HeroLoading = () => {
  return (
    <div className="mt-12 animate-pulse">
      <h2 className="bg-loading w-full max-w-60 rounded-md text-3xl font-semibold">
        &nbsp;
      </h2>
      <hr className="my-4" />
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
        <div className="order-2 flex gap-2 sm:order-1">
          <div className="bg-loading h-[100px] w-[100px] rounded-md"></div>

          <div className="flex gap-6">
            <p
              aria-hidden
              className="bg-loading flex items-start rounded-md text-5xl font-semibold text-black/0"
            >
              25
            </p>
            <div className="flex aspect-square flex-col justify-center gap-1 text-foreground/50">
              {Array(3)
                .fill(0)
                .map((_, index) => {
                  return (
                    <p
                      key={index}
                      className="bg-loading w-full max-w-36 rounded-md text-sm"
                    >
                      &nbsp;
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="order-1 flex w-full max-w-32 flex-col justify-center gap-1 sm:order-2">
          <p className="bg-loading rounded-md text-2xl"> &nbsp;</p>
          <p className="bg-loading rounded-md text-sm text-foreground/50">
            {" "}
            &nbsp;
          </p>
          <p className="bg-loading rounded-md text-sm capitalize text-foreground/50">
            &nbsp;
          </p>
        </div>
      </div>
      <h2 className="bg-loading mt-10 w-full max-w-32 rounded-md text-xl font-semibold">
        &nbsp;
      </h2>
      <hr className="my-4 border-accent/20" />
      <div className="scrollbar flex w-full gap-4 overflow-x-auto">
        {Array(5)
          .fill(0)
          .map((_, index) => {
            return (
              <div
                key={index}
                className="bg-loading flex w-full min-w-max flex-col items-center rounded-xl border px-4 py-4 sm:px-0"
              >
                <p>&nbsp;</p>
                <div className="mt-1 h-[50px] w-[50px]"></div>

                <p className="flex items-center gap-1 text-sm">
                  &nbsp;
                  <span className="text-foreground/50">&nbsp;</span>
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HeroLoading;
