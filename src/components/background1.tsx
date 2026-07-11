export default function Background() {
    return(

      <div className="fixed inset-0">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[170px] -top-40 -left-20" />
        <div className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[180px] bottom-0 right-0" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:64px_64px] opacity-[0.07] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

      </div>
    )
}