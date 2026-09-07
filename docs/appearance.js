// Shared, class-independent identity. Rendering is enabled for the Warrior and Mage.
export const APPEARANCE_OPTIONS={
 gender:[['Homme','Man'],['Femme','Woman']],
 face:[['Visage 1 · teint clair','Face 1 · light complexion'],['Visage 2 · teint hâlé','Face 2 · medium complexion'],['Visage 3 · teint foncé','Face 3 · dark complexion']],
 hair:[['Court balayé','Swept short'],['Boucles courtes','Short curls'],['Queue de cheval','Ponytail'],['Carré argenté','Silver bob']]
};
export function validAppearance(a){return !!a&&typeof a==='object'&&Object.entries(APPEARANCE_OPTIONS).every(([k,values])=>Number.isInteger(a[k])&&a[k]>=0&&a[k]<values.length);}
export function appearanceFromLook(look=0){const n=Number.isFinite(look)?Math.abs(Math.trunc(look)):0;return {gender:n%2,face:Math.floor(n/2)%3,hair:Math.floor(n/6)%4};}
export function appearanceOf(h){return validAppearance(h.appearance)?{...h.appearance}:{gender:0,face:0,hair:0};}
export function setAppearance(h,key,value){if(!Object.hasOwn(APPEARANCE_OPTIONS,key)||!Number.isInteger(value)||value<0||value>=APPEARANCE_OPTIONS[key].length)return false;h.appearance={...appearanceOf(h),[key]:value};return true;}
