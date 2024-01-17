'use client'
import {useEffect} from "react";
import {useParams} from "next/navigation";
import Link from "next/link";

import usePageStore, {setPages} from "@/store/pageStore";
import {getPages} from '@/utils/pages';

const Project = () => {
  const {projectname} = useParams<{projectname: string}>();
  const pages = usePageStore((state) =>state.pages);
  
  useEffect(() => {
    (async () => {
      const result = await getPages(projectname);

      if (result.success) {
        setPages(result.data);
      } else {
        setPages([])
      }
    })();
  }, [projectname])

  return (
    <div className="max-w-[800px] mx-auto h-[100vh] bg-slate-50 p-10">
      <h2 className="font-bold mb-10">页面列表</h2>
      <ul>
        {!!pages.length && pages.map((page) => {
          return (
            <li key={page}>
              <Link href={`/view/${projectname}/${page}`}>{page}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Project;
