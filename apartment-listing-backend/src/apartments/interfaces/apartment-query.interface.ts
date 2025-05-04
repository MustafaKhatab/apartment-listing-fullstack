export interface ApartmentQuery {
    unitName?: { $regex: string; $options: string };
    unitNumber?: { $regex: string; $options: string };
    project?: { $regex: string; $options: string };
}