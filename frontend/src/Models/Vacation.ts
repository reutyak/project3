class Vacation{
    id:number=0;
    description:string | undefined;
    destination:string | undefined;
    vacation_img:string='';
    start_date:Date=new Date();
    end_date:Date=new Date();
    price:number | undefined;
    amountOfFollowers:number=0;
}

export default Vacation;