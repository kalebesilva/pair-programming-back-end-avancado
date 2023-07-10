import { ObjectId } from "mongodb";

export default class ItemUrl{

    private name: string;
    private url: string;
    private id?: ObjectId;

    constructor(public nameC:string, public urlC: string, public idC?: ObjectId){

        this.name = nameC;
        this.url = urlC;
        this.id = idC;

    }

    getInObj(){
        return {
            id: this.id,
            name: this.name,
            url: this.url
        }
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getUrl(){
        return this.url;
    }

    setAll(obj: ItemUrl){
        this.id = obj.id;
        this.name = obj.name;
        this.url = obj.url;
    }

    setId(id: ObjectId){
        this.id = id;
    }

    setName(name: string){
        this.name = name;
    }

    setUrl(url: string){
        this.url = url;
    }

}