import ColorDataManager from "../managers/color-data.manager";
import DesignDataManager from "../managers/desig-data.manager";
import DesignTypeDataManager from "../managers/design-type.data-manager";
import EnvironmentDataManager from "../managers/environment.data.manager";
import EnvironmentTypeDataManager from "../managers/environment.type-data.manager";
import FormatDataManager from "../managers/format-data.manager";
import StructureDataManager from "../managers/structure-data.manager";
import groutDataManager from "../managers/grout-data.manager";
import { IEnvironment } from "../models/environment/environment.model";
import { IEnvironmentType } from "../models/EnvironmentType/environment-type.model";
import { IDesignType } from "../models/designType/design-type.model";
import { IDesign } from "../models/design/design.model";
import { IColor } from "../models/color/color.model";
import { IGrout } from "../models/grout/grout.model";
import { IStructure } from "../models/structure/structure.model";
import { IFormat } from "../models/format/format.model";
import { ExperienceViews } from "../../shared/enums/routes.enum";
import { INumberData } from "../models/NumberData/number-data.model";

class Singleton {
  private static instance: Singleton;


  public currentEnvironmentType: IEnvironmentType | null = null;
  public currentEnvironment: IEnvironment | null = null;
  public currentDesignList:IDesign[]| null = null;
  public currentColorList:IColor[]| null = null;
  public currentStructure: IStructure | null = null;
  public currentGrout: IGrout | null = null;
  public currentFormat: IFormat | null = null;
  public simulationArea:INumberData| null = null;
  public simulationWidht:INumberData| null = null
  public simulationHeight:INumberData| null = null


  public chessMode:boolean| null = null;


  public currentExperienceView:ExperienceViews| null = ExperienceViews.None;
setContentFunc: ((view: ExperienceViews) => void) | null = null;
evaluatePercentageFunc: ((percentage:number) => void) | null = null;


  private environmentDataManager: EnvironmentDataManager = new EnvironmentDataManager();
  private environmentTypeDataManager: EnvironmentTypeDataManager = new EnvironmentTypeDataManager();
  private designTypeDataManager: DesignTypeDataManager = new DesignTypeDataManager();
  private designDataManager: DesignDataManager = new DesignDataManager();
  private colorDataManager: ColorDataManager = new ColorDataManager();
  private groutDataManager: groutDataManager = new groutDataManager();
  private structureDataManager: StructureDataManager = new StructureDataManager();
  private formatDataManager: FormatDataManager = new FormatDataManager();

  private constructor() { }

  public static getInstance(): Singleton {
      if (!Singleton.instance) {
          Singleton.instance = new Singleton();
      }
      return Singleton.instance;
  }

  
  public SelectEnvironmentType(environmentType:IEnvironmentType) {
    console.log("SelectEnvironmentType called with environmentType", environmentType);
    this.currentEnvironmentType=environmentType;
    this.EvaluatePercentage();
  }



    public ChangeExperienceView(view: ExperienceViews) {
        if (this.setContentFunc) {
            this.currentExperienceView=view;
            this.setContentFunc(view);
        }
    }

    public EvaluatePercentage() {
        if (this.evaluatePercentageFunc) {
            
            const maxPercentageValue=8;

            let currProggressDone=0;

            if(this.currentEnvironment)
            {
                currProggressDone+=1;
            }
            if(this.currentEnvironmentType)
            {
                currProggressDone+=1;
            }
            if(this.currentColorList)
            {
                currProggressDone+=1;
            }
            if(this.currentDesignList)
            {
                currProggressDone+=1;
            }
            if(this.currentFormat)
            {
                currProggressDone+=1;
            }
            if(this.currentGrout)
            {
                currProggressDone+=1;
            }
            if(this.currentStructure)
            {
                currProggressDone+=1;
            }
            if(this.simulationArea)
            {
                currProggressDone+=1;
            }
            else if(this.simulationWidht && this.simulationHeight)
            {
                currProggressDone+=1;
            }

            let Percentage=currProggressDone*100/maxPercentageValue;
            if(Percentage>100)
            {
                Percentage=100;
            }
            this.evaluatePercentageFunc(Percentage);
        }
    }

  public SelectEnvironment(environment:IEnvironment)
  {
     this.currentEnvironment=environment;
     this.EvaluatePercentage();
  }
  // Add getters for each DataManager
  public getEnvironmentDataManager(): EnvironmentDataManager {
      return this.environmentDataManager;
  }

  public getEnvironmentTypeDataManager(): EnvironmentTypeDataManager {
      return this.environmentTypeDataManager;
  }

  public getDesignTypeDataManager(): DesignTypeDataManager {
      return this.designTypeDataManager;
  }

  public getDesignDataManager(): DesignDataManager {
      return this.designDataManager;
  }

  public getColorDataManager(): ColorDataManager {
      return this.colorDataManager;
  }

  public getgroutDataManager(): groutDataManager {
      return this.groutDataManager;
  }

  public getStructureDataManager(): StructureDataManager {
      return this.structureDataManager;
  }

  public getFormatDataManager(): FormatDataManager {
      return this.formatDataManager;
  }

  public addEnvironment(environment: IEnvironment): void {
    this.environmentDataManager.addEnvironment(environment);
}

public addEnvironmentType(environmentType: IEnvironmentType): void {
    
    console.log("Attemping to add environment type ",environmentType)
    this.environmentTypeDataManager.addEnvironmentType(environmentType);
}

public addDesignType(designType: IDesignType): void {
    this.designTypeDataManager.addDesignType(designType);
}

public addDesign(design: IDesign): void {
    this.designDataManager.addDesign(design);
}

public addColor(color: IColor): void {
    this.colorDataManager.addColor(color);
}

public addGrout(grout: IGrout): void {
    this.groutDataManager.addGrout(grout);
}

public addStructure(structure: IStructure): void {
    this.structureDataManager.addStructure(structure);
}

public addFormat(format: IFormat): void {
    this.formatDataManager.addFormat(format);
}
}

export default Singleton;