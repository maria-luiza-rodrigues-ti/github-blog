import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faBuilding, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Index() {
  return (
    <>
      <header className="bg-[url('images/cover.png')] bg-cover bg-center h-[296px] flex items-center justify-center">
      </header>
      <main>
        <article className='flex items-center gap-8 -mt-[88px] max-w-[864px] mx-auto px-10 py-8 bg-base-profile rounded-[10px]'>
          <img src="images/avatar.png" alt="" />
          <section className='flex flex-col'>
            <div className='flex justify-between mb-2'>
              <h2 className='font-sans text-2xl leading-[130%] text-base-title font-bold'>Cameron Williamson</h2>
              <a className='text-xs font-bold uppercase text-blue flex items-center gap-2'><span>GITHUB</span><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
            </div>
            <p className='mb-6 text-base-text text-base leading-[160%]'>Tristique volutpat pulvinar vel massa, pellentesque egestas. Eu viverra massa quam dignissim aenean malesuada suscipit. Nunc, volutpat pulvinar vel mass.</p>
            <ul className='flex gap-6 items-center'>
              <li className='flex gap-3 items-center text-base-subtitle text-base'><FontAwesomeIcon icon={faGithub} /><span>cameronwll</span></li>
              <li className='flex gap-3 items-center text-base-subtitle text-base'><FontAwesomeIcon icon={faBuilding} /><span>Rocketseat</span></li>
              <li className='flex gap-3 items-center text-base-subtitle text-base'><FontAwesomeIcon icon={faUserGroup} /><span>32 seguidores</span></li>
            </ul>
          </section>

        </article>
      </main>
    </>

  );
}

