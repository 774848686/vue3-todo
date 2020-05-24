export default (target,index)=>{
    for(let i=target.length-1;i>=0;i--){
        if(index===i){
             target.splice(index,1);
        }
    }
    return target;
}