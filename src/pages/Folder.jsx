import { useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import store from "../store";
import { Link, redirect } from "react-router-dom";


const Folder = () => {
    // let params = useParams();
    // console.log(params)
    const [folderPath, setPath] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const folder = useRef({})
    const aboveFolder = useRef()
    async function onOpen() {
        if (!isLoading)
            return
        let path = window.location.pathname.split('folder')[1];
        if (!path || path == "")
            path = '/'
        if (path[0] == '/')
            path = path.slice(1, path.length)
        if (path.at(-1) == '/')
            path = path.slice(0, path.length - 1)
        let tmp_for_above = aboveFolder.current = path.split('/')
        tmp_for_above.pop()
        aboveFolder.current = tmp_for_above.join('/')
        setPath(path)

        folder.current = await store.fetchFolder(path)

        if (store.sourceNotFound)
            return

        folder.current.subfolders = folder.current.subfolders.sort((a, b) => (a.path < b.path ? -1 : 1))
        folder.current.books = folder.current.books.sort((a, b) => (a.title < b.title ? -1 : 1))
        
        setIsLoading(false)
    }

    function drawIcon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20px" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>

        )
    }

    function renderPage() {
        return <>
            <h1 style={{ marginBottom: 0 }}>/{decodeURI(folderPath)}</h1>
            {<a href={'/folder/' + aboveFolder.current}>[parent folder]</a>}


            <div style={{marginTop: 10}}>
            <b>Folders:</b>
                {/* {JSON.stringify(folder.current.books)} */}
                {folder.current.subfolders.map(f => {
                    let path_with_slash = '/folder' + f.path
                    if (f.path.endsWith('/'))
                        f.path = f.path.slice(0, f.path.length - 1)
                    let processedPath = f.path.slice(1, f.path.length).split('/')
                    if (processedPath.length > 1)
                        processedPath = processedPath.at(-1)
                    else
                        processedPath = processedPath.join('')
                    return (
                        <div style={{ display: 'flex', alignContent: 'center' }}>
                            {/* {drawIcon()} */}
                            <a style={{ paddingLeft: 5 }} href={path_with_slash}>{processedPath}</a>
                        </div>
                    )
                })}
            </div>

            <br />

            <b>Books:</b>
            {folder.current.books.map(b => {
                return (<div>
                    <a style={{ paddingLeft: 5 }} href={'/book/' + b.book_id}>[{b.format}] {b.title}</a>
                </div>)
            })}
        </>
    }

    useEffect(() => {
        onOpen()
    })
    return (
        <div>
            {store.sourceNotFound && <Navigate to={"/404"}/>}
            {isLoading ? <>Loaidng...</> : renderPage()
            }
        </div>)
};

export default Folder;