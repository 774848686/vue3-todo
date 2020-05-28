import {
    Store,
    deleArr
} from '../utils';
const KEY_STORE = 'taskList-vue@3-demo'
export const todoStorage = {
    get() {
        return JSON.parse(Store.get(KEY_STORE) || '[]')
    },
    set(value) {
        Store.set(KEY_STORE, JSON.stringify(value));
    },
    reSet(id, row) {
        let store = todoStorage.get();
        let curStore = store.map(item => {
            if (item.id === id) {
                item = row;
            }
            return item;
        });
        todoStorage.set(curStore);
    }
}
// NOTE：为了后期与后端进行数据交互，写了一个filters 去统一处理数据；
export const filters = {
    fetch(id) {
        return todoStorage.get().filter(item => item.id === id)[0];
    },
    search(keyword) {
        const store = todoStorage.get();
        const SKIP_KEY = 'quanbu';
        let filterCur = [];
        let testtemp = store.filter(item => item.id !== SKIP_KEY).reduce((pre, cur) => {
            filterCur = keyword ? cur.child.filter(item => item.detail.includes(keyword)) : cur.child
            filterCur.forEach(item => {
                item.parentId = cur.id;
            });
            return [...pre, ...filterCur];
        }, [])
        return testtemp
    },
    add(id, value) {
        let target = filters.fetch(id);
        target.child.push(value);
        filters.filterSet(id, target);
        return filters.fetch(id);
    },
    dele(parentId, id) {
        let target = filters.fetch(parentId);
        const curIndex = target.child.findIndex(item => item.id === id);
        console.log(target.done,target.child,curIndex)
        target.done.push(target.child[curIndex]);
        target.child = deleArr(target.child, curIndex);
        filters.filterSet(parentId, target);
        return filters.fetch(parentId);
    },
    filterSet(id, target) {
        let cur = todoStorage.get().map(item => {
            if (item.id === id) {
                item = target;
            }
            return item
        });
        todoStorage.set(cur);
    }
}