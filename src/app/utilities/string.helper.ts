export class StringHelper {
    public static isValueEmpty(text: string): boolean {
        return !text || !text.trim();
    }

    public static isValueChanged(currentValue: string, oldValue: string): boolean {
        if (currentValue === oldValue) {
            return false;
        }
        //
        try {
            switch (true) {
                case currentValue == null && oldValue == null:
                    return false;
                // null and '' -> no changed
                case currentValue == null && this.isValueEmpty(oldValue):
                case oldValue == null && this.isValueEmpty(currentValue):
                    return false;
                case currentValue == null && !this.isValueEmpty(oldValue):
                case oldValue == null && !this.isValueEmpty(currentValue):
                    return true;
                default:
                    return currentValue.trim() !== oldValue.trim();
            }
        } catch {
            return false;
        }
    }
}
