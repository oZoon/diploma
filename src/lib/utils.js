import { PHOTO_WIDTH } from 'lib/constants';

export const checkCode = () => {
    return location.search.includes('?code=') ? location.search.split('?code=')[1] : false;
}

export const parseArrInThree = (sortedOld, arr) => {
    const sorted = JSON.parse(JSON.stringify(sortedOld));
    const allID = [...sorted[0].arrID, ...sorted[1].arrID, ...sorted[1].arrID];
    const clearArr = arr.filter(item => !allID.includes(item.id));
    clearArr.forEach(item => {
        const height = PHOTO_WIDTH * item.height / item.width;
        const heightMin = Math.min(sorted[0].height, sorted[1].height, sorted[2].height);
        let index;
        for(let i = 0; i < sorted.length; i++){
            if(heightMin == sorted[i].height){
                index = i;
                break;
            }
        }
        sorted[index].height = sorted[index].height + height;
        sorted[index].arrID.push(item.id);
        sorted[index].list.push(item);
    });
    return sorted;
}
