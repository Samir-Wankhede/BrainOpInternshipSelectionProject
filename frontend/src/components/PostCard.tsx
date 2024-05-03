import React from 'react'

export default function PostCard(props:any) {
const timestamp = props.date;
const date = new Date(timestamp);
const formattedDate = date.toISOString().slice(0, 10);

  return (
    <>
      {/* Column */}
      <div className="my-3 px-1 w-full  md:w-1/2">

            {/* Article */}
            <article ref={props.passref} className="overflow-hidden rounded-lg shadow-lg shadow-black/30 ">

            <a href="#">
                <img alt={props.alt} className="block h-auto w-full" src={props.photo}/>
            </a>

            <header className="flex items-center leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                    <span className="no-underline  text-black">
                        {props.caption}
                    </span>
                </h1>
            </header>

            <footer className="flex items-center justify-between leading-none p-2 md:p-4">
            <p className="text-grey-darker text-sm">
                    {formattedDate}
                </p>
                <p className='ml-2 text-sm ' > {props.location} </p>
                    <p className="ml-2 text-sm">
                        Author: {props.username}
                    </p>
            </footer>

            </article>
            {/* Article END */}

            </div>
            {/* Column END */}
    </>
  )
}
