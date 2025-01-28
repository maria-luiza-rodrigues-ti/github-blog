import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faBuilding, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link, useLoaderData } from '@remix-run/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
  const [issues, setIssues] = useState([])

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
    getIssues()
  }, [])

  useEffect(() => {
    console.log("Issues:", issues)
  }, [issues])


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
          <form action="" className='grid grid-cols-2 grid-rows-2 justify-between max-w-[864px] mx-auto gap-y-3 mb-12'>
            <label htmlFor="" className='text-base-subtitle text-lg leading-[160%] font-bold'>Publicações</label>
            <span className='text-right text-base-span text-sm leading-[160%] font-sans'>6 publicações</span>
            <input type="text" placeholder='Buscar conteúdo' className='col-span-2 rounded-md border border-base-border bg-base-input px-4 py-3 placeholder:text-base placeholder:font-sans placeholder:font-normal placeholder:text-base-label' />
          </form>
          <ul className='flex flex-wrap gap-8 max-w-[864px] mx-auto'>
            <li className='max-w-[416px] bg-base-post rounded-[10px] p-8'>
              <Link to={`/post/1`}>
                <article>
                  <header className='flex gap-4 justify-between'>
                    <h2 className='text-base-title font-sans text-xl font-bold w-4/5'>JavaScript data types and data structures</h2>
                    <span className='font-sans text-sm leading-[160%] text-right text-base-label'>Há 1 dia</span>
                  </header>
                  <section className='mt-5'><p className='overflow-hidden text-ellipsis line-clamp-4 text-base-text'>Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in JavaScript and what properties they have. These can be used to build other data structures. Wherever possible, comparisons with other languages are drawn.

                    Dynamic typing
                    JavaScript is a loosely typed and dynamic language. Variables in JavaScript are not directly associated with any particular value type, and any variable can be assigned (and re-assigned) values of all types:

                    let foo = 42; // foo is now a number
                    foo = 'bar'; // foo is now a string
                    foo = true; // foo is now a boolean</p></section>
                </article>
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </>

  );
}

