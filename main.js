btn.addEventListener('click',()=>{
    // 动态创建script标签
    let script = document.createElement('script');
    // 随机生成函数名
    let functionName = 'dobby'+parseInt(Math.random()*10000,10);

    window[functionName] = (result)=>{
        if(result === 'success'){
            amount.innerText = amount.innerText - 1;
        }else{
            alert('fail');
        }
    }
    // 指定发起请求的地址
    script.src = 'http://frank.com:8889/pay?callback='+functionName;
    // 一定要将script加进去
    document.body.appendChild(script);
    script.onload = (e)=>{
        // 每次动态创建script标签之后,都将script标签删掉
        e.currentTarget.remove();
        // 无论script标签加载成功或失败都需要将window[functionName]属性删除
        delete window[functionName];
    }
    script.onerror = ()=>{
        alert('fail');
        delete window[functionName];
    }
})