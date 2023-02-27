import Folder from "./components/Folder";
import File from "./components/File";
import { FOLDER_TYPE, FILE_TYPE } from "./Constants";

import { v4 as uuidv4 } from 'uuid';

/** Реалізація функції renderCurrentType(), якщо потрібно не відображати папки в яких нема
 * файлів за результатами пошуку, введенного через input !!!
 * Є два стану в самому App.js. Це 'browser' та 'search'. В Folder.jsx тільки стан 'browser'.
 * 'browser' встановлюється в App.js при старті застосунку та є параметром по замовченню в renderCurrentType().
 * В renderCurrentType() це необов'язково. Але залишено для наглядності, бо було створено на початковому етапі розробки.
 * Ця логіка відповідає за перехід по папкам, та перегляду, що в них.
 * Логіка 'search' вмикається при вводі пошукового слова в поле input. І трапляється пошук та відображення,
 * з урахування шляхів, що передаються в expandedFolders.
 * В Folder.jsx доданий 'browser', щоб можно було, згорнувши папку, розгорнути і подивитися ВСІ файли що є неї.
 * Якщо такий функціонал не потрібен, то його можно прибрати.
 */
// export const renderCurrentType = (data, expandedFolders = [], logic = 'browser') => {
//     return data.map(item => {
//         if (logic === 'browser') {
//             if (item.type === FOLDER_TYPE) {
//                 return <Folder key={uuidv4()} name={item.name} children={item.children} expandedFolders={expandedFolders} logic={logic}/> 

//             } else {
//                 return <File key={uuidv4()} name={item.name} mime={item.mime} expandedFolders={expandedFolders}/>
//             }
//         }

//         if (logic === 'search') {
//             if (item.type === FOLDER_TYPE && expandedFolders.includes(`/${item.name}`)) {
//                 return <Folder key={uuidv4()} name={item.name} children={item.children} expandedFolders={expandedFolders} logic={logic}/> 
//             }

//             if (item.type === FILE_TYPE && expandedFolders.includes(`/${item.name}`)) {
//                 return <File key={uuidv4()} name={item.name} mime={item.mime} expandedFolders={expandedFolders}/>
//             }
//         }

//         return null

//     })
// }

/** Реалізація функції renderCurrentType(), якщо папки в яких нема файлів за результатами пошуку,
 * введенного через input, можно залишити відображеними !!! 
 * Треба прибрати логіку в App.js та Folder.jsx пов'язану з'browser' та 'search'. Вона вже не потрібна,
 * бо більш простіша логіка в функції опрацьовує всі випадки */
export const renderCurrentType = (data, expandedFolders = []) => {
    return data.map(item => 
    item.type === FOLDER_TYPE
                ? ( <Folder 
                        key={uuidv4()} 
                        name={item.name} 
                        children={item.children}
                        expandedFolders={expandedFolders}/>
                )
                : expandedFolders.includes(`/${item.name}`) || !expandedFolders.length
                    ? ( <File
                            key={uuidv4()} 
                            name={item.name} 
                            mime={item.mime} 
                            expandedFolders={expandedFolders}/>
                    )
                    : null

    )
}
        
    

export const treeToMap = (data = [], path = '/') => {
    let map = {}

    data.forEach(item => {
        if(item.type === FOLDER_TYPE) {
            map = {...map, ...treeToMap(item.children, `${path}${item.name}/`)}
        } else {
            // console.log()
            map[`${path}${item.name}`] = item.name
        }   
    })

    return map;
}

export function debonce(callback, delay) {
    let timer;

    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(this, args)
        }, delay);
    }
}