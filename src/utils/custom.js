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
    }
}
// NOTE：为了后期与后端进行数据交互，写了一个filters 去统一处理数据；
// 现在是存在缓存里，所以可省略；可直接用props的数据；
export const filters = {
    fetch(id) {
        return todoStorage.get().filter(item => item.id === id)[0];
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