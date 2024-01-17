'use client'
import {useEffect} from 'react';
import Link from 'next/link';

import usePageStore, {setProjects} from '@/store/pageStore';
import {getProjects} from '@/utils/projects';

const Projects = () => {
  const projects = usePageStore((state) => state.projects);

  useEffect(() => {
    (async () => {
      const result = await getProjects();

      if (result.success) {
        setProjects(result.data);
      } else {
        setProjects([]);
      }
    })();
  }, [])

  return <div className="max-w-[800px] mx-auto h-[100vh] bg-slate-50 p-10">
    <h2 className="font-bold mb-10">项目列表</h2>
    <ul>
      {!!projects.length && projects.map((project) => {
        return (
          <li key={project}>
            <Link href={`/view/${project}`}>{project}</Link>
          </li>
        )
      })}
    </ul>
  </div>
}

export default Projects;
