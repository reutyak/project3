class Vacation{
    id:number=0;
    description:string | undefined;
    destination:string | undefined;
    price:number | undefined;
    vacation_img:any='';
    start_date:Date=new Date();
    end_date:Date=new Date();
    amountOfFollowers:number=0;
}

export default Vacation;