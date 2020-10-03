function query(sel) {
    return document.querySelector(sel)
}

let keys = ['inReason', 'outReason', 'trace', 'street']
let elems = keys.map((k) => query('#' + k))
chrome.storage.sync.get(keys, function (res) {
    // 初始值
    for (let i = 0; i < keys.length; i++) {
        elems[i].value = res[keys[i]] || ""
    }
})
query('#save').addEventListener('click', () => {
    // 保存数据
    let data = {}
    for (let i = 0; i < keys.length; i++) {
        data[keys[i]] = elems[i].value
    }
    console.log(data)
    chrome.storage.sync.set(data, function () {
        console.log('保存成功！');
        alert('保存成功')
    });
})