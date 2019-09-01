import LRU from 'lru-cache'

const options = {
    maxAge: 1000 * 60 * 10,
}

const cache=new LRU(options)

export function setCache(repo){
    const {full_name}=repo
    cache.set(full_name,repo);
}

export function setnameCache(name,repos){
    cache.set(name,repos);
}

export function getCache(full_name){
    return cache.get(full_name)
}

export function setCacheArray(repos){
    repos.forEach(repo => {
        setCache(repo)
    });
}
