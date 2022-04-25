class VacationModel {
    public id: number;
    public destination: string = "";
    public description: string = "";
    public startDate: string = "";
    public endDate: string = "";
    public price: number = 0;
    public imageName: string = "";
    public image: FileList = null;

    public isUserFollow: boolean = false;
    public numOfFollowers: number = 0;
}

export default VacationModel;

// SELECT v.vacationId AS id, v.destination, v.description, v.imageName, v.price,
//             DATE_FORMAT(v.startDate, '%d/%m/%Y') AS startDate, 
//             DATE_FORMAT(v.endDate,'%d/%m/%Y') AS endDate,
//             follows_table.userId AS isUserFollow,  

//             (SELECT COUNT(*) FROM follows_table          
//             WHERE vacationId = v.vacationId) AS numOfFollowers  

//             FROM vacations v 

//             LEFT JOIN follows_table 
//             ON v.vacationId = follows_table.vacationId && follows_table.userId = ?
            
//             ORDER BY follows_table.userId DESC