import { Notyf } from "notyf";

class NotifyService {

    private notification = new Notyf({ duration: 4000, position: { x: "left", y: "bottom" } });

    public success(message: string): void {
        this.notification.success(message);
    }
    
    public error(err: any): void {
        const message = this.extractErrorMessage(err);
        this.notification.error(message);
    }

    private extractErrorMessage(err: any): string {

        if(typeof err === "string") return err;

        if(typeof err.response?.data === "string") return err.response.data;

        if(Array.isArray(err.response?.data)) return err.response.data[0];

        if(typeof err.message === "string") return err.message; // Must be after the above conditions

        return "Some error, please try again...";
    }
}

const notify = new NotifyService();

export default notify;