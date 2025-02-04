import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faBuilding, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link, useLoaderData } from '@remix-run/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { GitHubSearchIssuesResponse, Issue } from '~/interfaces/GithubAPIResponse';
import Markdown from 'react-markdown';
import { getDaysSinceUpdate } from '~/utils/getDaysSinceUpdate';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';

const SearchSchema = z.object({
  search: z.string().nonempty("Campo de busca não pode ser vazio")
})

type SearchInput = z.infer<typeof SearchSchema>;

export const loader = async () => {
  try {
    const response = await fetch(`https://api.github.com/users/maria-luiza-rodrigues-ti`)
    const data = await response.json()
    return data;
  } catch (error) {
    console.error("Error fetching user data", error)
  }
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [issues, setIssues] = useState<GitHubSearchIssuesResponse | null>(null);
  const { handleSubmit, control, reset, formState: { errors } } = useForm<SearchInput>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: ""
    }
  })

  async function getIssues() {
    const encodedQuery = `repo:github-blog type:issue is:issue user:maria-luiza-rodrigues-ti`

    const response = await axios.get("https://api.github.com/search/issues", {
      params: {
        _sort: 'created',
        _order: "desc",
        q: encodedQuery,
        type: "issue",
        per_page: 10
      }
    })

    setIssues(response.data)
  }

  useEffect(() => {
    getIssues();
  }, [])

  function handleSearchIssues(formData: SearchInput) {
    const query = formData.search;

    if (query === "") {
      setIssues(null);
      reset();
      return;
    }

    const filteredIssues = issues?.items?.filter((issue) => {
      return issue.title.toLowerCase().includes(query.toLowerCase())
    })

    setIssues((prevIssues) => prevIssues ? {
      ...prevIssues,
      items: filteredIssues || []
    } : null)

    reset();
  }

  return (
    <>
      <header className="bg-[url('images/cover.png')] bg-cover bg-center h-[296px] flex items-center justify-center relative">
      </header>
      <main>
        <article className='flex z-10 items-center gap-8 absolute max-w-[864px] mx-auto px-10 py-8 bg-base-profile rounded-[10px] left-1/2 -translate-x-1/2 top-[208px] w-full'>
          <img src={data.avatar_url} alt="" className='w-[148px] h-[148px] object-cover rounded-lg overflow-hidden' />
          <section className='flex flex-col max-w-[calc(100-180px)] w-full'>
            <div className='flex justify-between mb-2'>
              <h2 className='font-sans text-2xl leading-[130%] text-base-title font-bold'>{data.name}</h2>
              <a className='text-xs font-bold uppercase text-blue flex items-center gap-2'><span>GITHUB</span><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
            </div>
            <p className='mb-6 text-base-text text-base leading-[160%]'>{data.bio}</p>
            <ul className='flex gap-6 items-center'>
              <li className='flex gap-2 items-center text-base-subtitle text-base'><FontAwesomeIcon icon={faGithub} /><span>{data.login}</span></li>
              <li className='flex gap-2 items-center text-base-subtitle text-base'><FontAwesomeIcon icon={faBuilding} /><span>{data.company}</span></li>
              <li className='flex gap-2 items-center text-base-subtitle text-base'><FontAwesomeIcon icon={faUserGroup} /><span>{data.followers} seguidores</span></li>
            </ul>
          </section>
        </article>
        <section className='bg-base-background pt-[200px] min-h-[calc(100vh-296px)]'>
          <form onSubmit={handleSubmit(handleSearchIssues)} className='grid grid-cols-2 grid-flow-row auto-rows-max justify-between max-w-[864px] mx-auto gap-y-3 mb-12'>
            <label htmlFor="" className='text-base-subtitle text-lg leading-[160%] font-bold'>Publicações</label>
            <span className='text-right text-base-span text-sm leading-[160%] font-sans'>6 publicações</span>
            <Controller
              control={control}
              name="search"
              render={({ field }) => (
                <>
                  <input {...field} type="text" placeholder='Buscar conteúdo' className='col-span-2 rounded-md border border-base-border bg-base-input px-4 py-3 placeholder:text-base placeholder:font-sans text-base-text placeholder:font-normal placeholder:text-base-label' onChange={field.onChange} />
                  <ErrorMessage
                    errors={errors}
                    name="search"
                    render={({ message }) => <p className='text-xs text-red-500'>{message}</p>}
                  />
                </>
              )}
            />
          </form>
          <ul className='flex flex-wrap gap-8 max-w-[864px] mx-auto'>
            {issues && issues.items?.map((issue: Issue) => (
              <li key={issue.id} className='max-w-[416px] bg-base-post rounded-[10px] p-8'>
                <Link to={`/post/${issue.number}`}>
                  <article>
                    <header className='flex gap-4 justify-between'>
                      <h2 className='text-base-title font-sans text-xl font-bold w-full'>{issue.title}</h2>
                      <span className='font-sans text-sm leading-[160%] text-right text-base-label w-full max-w-max'>{getDaysSinceUpdate(issue.updated_at)}</span>
                    </header>
                    <section className='mt-5 overflow-hidden text-ellipsis line-clamp-4 text-base-text'><Markdown>{issue.body}</Markdown></section>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

