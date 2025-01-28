import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faCalendarDay, faChevronLeft, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "@remix-run/react";
import Markdown from "react-markdown";

export default function Post() {
  const navigate = useNavigate();

  function backToLastPage() {
    navigate(-1);
  }

  return (
    <main>
      <article className='flex flex-col z-10 items-center gap-5 absolute max-w-[864px] mx-auto px-10 py-8 bg-base-profile rounded-[10px] left-1/2 -translate-x-1/2 top-[208px] w-full'>
        <header className="flex justify-between w-full">
          <button onClick={backToLastPage} className="text-xs font-bold text-blue uppercase flex items-center gap-3"><FontAwesomeIcon icon={faChevronLeft} />
            <span>VOLTAR</span></button>
          <a href="" className="text-xs font-bold text-blue uppercase flex items-center gap-3"><span>VER NO GITHUB</span><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
        </header>
        <section className="w-full">
          <h1 className="text-base-title text-2xl font-bold text-left">JavaScript data types and data structures</h1>
          <ul className='flex gap-8 items-center mt-3'>
            <li className='flex gap-2 items-center text-base-span text-base'><FontAwesomeIcon icon={faGithub} /><span>cameronwll</span></li>
            <li className='flex gap-2 items-center text-base-span text-base'><FontAwesomeIcon icon={faCalendarDay} /><span>Há 1 dia</span></li>
            <li className='flex gap-2 items-center text-base-span text-base'><FontAwesomeIcon icon={faComment} /><span>5 comentários</span></li>
          </ul>
        </section>
      </article>
      <section className='bg-base-background pt-[200px] min-h-[calc(100vh-296px)]'>
        <article className="px-8 pb-40">
          <Markdown></Markdown>
        </article>
      </section>
    </main>
  )
}