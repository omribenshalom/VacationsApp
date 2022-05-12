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
