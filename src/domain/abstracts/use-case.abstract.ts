export abstract class UseCaseAbstract<InputType, ReturnType> {
  abstract execute(...condition: InputType[]): Promise<ReturnType> | ReturnType;
}
