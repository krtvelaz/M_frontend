export interface IEvent {
    id?: number;
    eve_title: string;
    eve_description: string;
    eve_place: string;
    eve_date: string;
    eve_hour: string;
    eve_with_limit_entry: boolean;
    eve_limit_entry: number;
    eve_publicada?: boolean;
    eve_status?: string;
    eve_attendance_limit?: boolean;
    eve_attendance_quota?: number;
}