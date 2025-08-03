import {faker} from "@faker-js/faker";
import { GoogleBookItem } from "../types";

export const generateBookMock = (size: number): GoogleBookItem[] => {
    return Array.from({length: size}, () => (
       {
        id: faker.string.uuid(),
        volumeInfo: {
            title: faker.lorem.sentence(),
            authors: [faker.person.fullName()],
            publisher: faker.company.name(),
            publishedDate: faker.date.anytime().toISOString(),
            description: faker.lorem.paragraph(),
            pageCount: faker.number.int({min: 100, max: 1000}),
            imageLinks: {
                thumbnail: faker.image.urlLoremFlickr({
                    category: "books",
                    width: 128,
                    height: 192
                })
            }
        }
       }
    ))
}