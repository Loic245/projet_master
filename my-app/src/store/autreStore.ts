import { action, observable, makeObservable } from "mobx";
import axios from "axios";
import config from "../config";


export interface IAutreInterface {
    allData : any;
    annee : any;
    matiereParProf : any[];
    listeEtudiant : any[];
    getData : () => void;
    saveData : (periode: string) => void;
    saveAnnee : (data: string) => void;
    getAnnee : () => void;
    updateAnnee : (data: any) => void;
    getMatiereParProf : (matricule : string) => void;
    etudiantParNiveau : (niveau : string) => void;
}

class AutreInterfaceStore implements IAutreInterface {
    @observable allData = {};

    @observable annee = {};

    @observable matiereParProf = [];

    @observable listeEtudiant = [];

    constructor () {
        makeObservable(this)
    }

    @action getAnnee = async() => {
        try {
            const result = await axios.get(`${config.baseURL}/autre/annee`)
            if(result.data) {
                this.annee = result.data.annee
            }
        } catch (e: any) {
            console.log("Enable to get annee")
        }
    }

    @action updateAnnee = async(data: any) => {
        try {
            const updated = await axios.patch(`${config.baseURL}/autre/annee`, { id : data?._id, annee: data?.annee })
            if(updated.data) {
                this.getAnnee();
            }
        } catch (e: any) {
            console.log("Enable to update annee")
        }
    }

    @action saveAnnee = async(data: string) => {
        try {
            const result = await axios.post(`${config.baseURL}/autre/annee`, { annee : data})
            if(result.data) {
                console.log("result : ",result.data)
            }
        } catch (e: any) {
            console.log("Enable to save annee")
        }
    }

    @action getData = async() => {
        try {
            const result = await axios.get(`${config.baseURL}/autre`)
            if(result.data) {
                this.allData = result.data.autre
            }
        } catch (e: any) {
            console.log("Enable to get Autre data")
        }
    }

    @action saveData = async(periode: string) => {
        try {
            const created = await axios.post(`${config.baseURL}/autre`, {data : periode});
            if(created.data) {
                this.getData()
            }
        } catch (e: any) {
            console.log("Enable to save Autre data")
        }
    }

    @action getMatiereParProf = async(matricule: string) => {
        try {
            const result = await axios.get(`${config.baseURL}/autre/${matricule}`)

            if(result.data) {
                this.matiereParProf = result.data.list[0]?.matiere
            }
        } catch (e: any) {
            console.log("Enable to get matiere per prof")
        }
    }

    @action etudiantParNiveau = async(niveau : string) => {
        try {
            const result = await axios.get(`${config.baseURL}/autre/liste/${niveau}`)

            if(result.data) {
                this.listeEtudiant = result.data.list
            }
        } catch (e: any) {
            console.log("Enable to get etudiant per niveau")
        }
    }
}

export default new AutreInterfaceStore();