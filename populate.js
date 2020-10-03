function query(sel) {
    return document.querySelector(sel)
}

function qa(sel) {
    return document.querySelectorAll(sel)
}

function simulateEvent(elem, event) { //js触发事件--事件构造器
    var evt = document.createEvent("Event");
    evt.initEvent(event, true, true);
    elem.dispatchEvent(evt);
}

console.log('matched')
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        handleClick(request.type)
        sendResponse('over')
    });


function handleClick(x) {
    if (x == 0) {
        // 入校
        // 出入校选项 点击倒三角
        query('label[for=sqlb]+div span.el-input__suffix').click()
        let ns = qa("ul.el-scrollbar__view li span")
        for (let i = 0; i < ns.length; i++) {
            if (ns[i].textContent === '入校') {
                ns[i].click()
                break;
            }
        }
        // 让click回调先执行
        setTimeout(() => {
            chrome.storage.sync.get({ street: '海淀路', inReason: '学习', }, function (res) {
                // 街道
                let streetInput = query('label[for=jzdbjjd]+div textarea')
                streetInput.value = res.street
                simulateEvent(streetInput, 'input')
                // 事由
                let reasonInput = query('label[for=crxsy]+div textarea')
                reasonInput.value = res.inReason
                simulateEvent(reasonInput, 'input')
            })
            // 14日内在京
            query('label[for=jzdbjyzzj14]+div input[value=y]').click()
            // 承诺
            query('label.el-checkbox input[value]').click()
            // 所在区。当前限定海淀区
            query('label[for=jzdbjqx]+div span.el-input__suffix').click()
            ns = qa("ul.el-scrollbar__view li span")
            for (let i = 0; i < ns.length; i++) {
                if (ns[i].textContent === '海淀区') {
                    ns[i].click()
                    break;
                }
            }
        }, 0);
    } else {
        // 出校
        // 出入校选项 点击倒三角
        query('label[for=sqlb]+div span.el-input__suffix').click()
        let ns = qa("ul.el-scrollbar__view li span")
        for (let i = 0; i < ns.length; i++) {
            if (ns[i].textContent === '出校') {
                ns[i].click()
                break;
            }
        }
        // 让click回调先执行
        setTimeout(() => {
            chrome.storage.sync.get({ trace: '北大南门-海淀路社区', outReason: '回家', }, function (res) {
                // 轨迹
                let traceInput = query('label[for=cxxdgj]+div textarea')
                traceInput.value = res.trace
                simulateEvent(traceInput, 'input')
                // 事由
                let reasonInput = query('label[for=crxsy]+div textarea')
                reasonInput.value = res.outReason
                simulateEvent(reasonInput, 'input')
            })
            // 承诺
            query('label.el-checkbox input[value]').click()
        }, 0);
    }
}
