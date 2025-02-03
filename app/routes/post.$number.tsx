import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faCalendarDay, faChevronLeft, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getDaysSinceUpdate } from "~/utils/getDaysSinceUpdate";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const response = await fetch(`https://api.github.com/repos/maria-luiza-rodrigues-ti/github-blog/issues/${params.number}`)
    const issue = await response.json();
    return issue;
  } catch (error) {
    console.error("Error fetching post data", error)
  }
}

export default function Post() {
  const navigate = useNavigate();
  const issue = useLoaderData<typeof loader>();

  function backToLastPage() {
    navigate(-1);
  }

  useEffect(() => {
    console.log(issue)
  }, [issue])

  return (
    <main>
      <article className='flex flex-col z-10 items-center gap-5 absolute max-w-[864px] mx-auto px-10 py-8 bg-base-profile rounded-[10px] left-1/2 -translate-x-1/2 top-[208px] w-full'>
        <header className="flex justify-between w-full">
          <button onClick={backToLastPage} className="text-xs font-bold text-blue uppercase flex items-center gap-3"><FontAwesomeIcon icon={faChevronLeft} />
            <span>VOLTAR</span></button>
          <a href={issue.html_url} target="_blank" className="text-xs font-bold text-blue uppercase flex items-center gap-3"><span>VER NO GITHUB</span><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
        </header>
        <section className="w-full">
          <h1 className="text-base-title text-2xl font-bold text-left">{issue.title}</h1>
          <ul className='flex gap-8 items-center mt-3'>
            <li className='flex gap-2 items-center text-base-span text-base'><FontAwesomeIcon icon={faGithub} /><span>{issue.user.login}</span></li>
            <li className='flex gap-2 items-center text-base-span text-base'><FontAwesomeIcon icon={faCalendarDay} /><span>{getDaysSinceUpdate(issue.updated_at)}</span></li>
            <li className='flex gap-2 items-center text-base-span text-base'><FontAwesomeIcon icon={faComment} /><span>{issue.comments <= 1 ? `${issue.comments} comentário` : `${issue.comments} comentários`}</span></li>
          </ul>
        </section>
      </article>
      <section className='bg-base-background pt-[160px] min-h-[calc(100vh-296px)]'>
        <article className="px-8 pb-40 max-w-[864px] mx-auto prose prose-lg text-base-text dark:prose-invert prose-pre:bg-base-post prose-pre:text-base-text prose-blockquote:rounded-sm prose-blockquote:bg-base-post prose-blockquote:pl-4 prose-code:px-1 prose-code:py-0.5 prose-a:text-blue prose-a:underline prose-strong:text-base-text prose-strong:font-bold prose-headings:text-base-title">
          <Markdown remarkPlugins={[remarkGfm]}>{issue.body}</Markdown>
        </article>
      </section>
    </main>
  )
}