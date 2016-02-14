/**
 * Set of rules (we consider the dice set to be part of the rules) we are publishing from the module
 * @module Rules
 */
declare module StatRules {
    /**
     * List of Dice and how they should be rolled for different stats
     */
    const dice: {
        ageModifier: {
            count: number;
            max: number;
            add: number;
        };
        strength: {
            count: number;
            max: number;
            add: number;
        };
        dexterity: {
            count: number;
            max: number;
            add: number;
        };
        intelligence: {
            count: number;
            max: number;
            add: number;
        };
        constitution: {
            count: number;
            max: number;
            add: number;
        };
        appearance: {
            count: number;
            max: number;
            add: number;
        };
        power: {
            count: number;
            max: number;
            add: number;
        };
        size: {
            count: number;
            max: number;
            add: number;
        };
        education: {
            count: number;
            max: number;
            add: number;
        };
    };
    /**
     * Specific calculations we are after.
     * @type {any}
     */
    const calculations: {
        sanity: number;
        idea: number;
        luck: number;
        knowledge: number;
    };
    /**
     * Number for male.
     * @type {number}
     */
    const male: number;
    /**
     * Number for female.
     * @type {number}
     */
    const female: number;
    /**
     * List of sexual orientations: 3% bisexual, 2% homosexual, 95% heterosexual - gets shuffled plus index is randomized
     * @type {string[]}
     */
    function sexualOrientations(): any;
    function checkStats(stats: CharacterStats): boolean;
    const statLimit: number;
    function calculateMissingStats(character: Character): void;
}
export default StatRules;
