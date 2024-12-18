import fs from 'fs';
import path from 'path';

export function generateRelationsFromPrismaSchema() {
    const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');

    const relations = {};
    const modelRegex = /model\s+([\w]+)\s*\{([\s\S]*?)\}/g;
    const relationFieldRegex = /(\w+)\s+\w+\s*@relation\(([^)]*)\)/g;
    const arrayRelationRegex = /(\w+)\s+([\w]+)\s*\[\]/g;

    let match;
    while (match = modelRegex.exec(schemaContent)) {
        const modelName = match[1];
        const modelContent = match[2];
        relations[modelName] = [];

        // Match fields with @relation
        let relationFieldMatch;
        while (relationFieldMatch = relationFieldRegex.exec(modelContent)) {
            const fieldName = relationFieldMatch[1];
            const relationParams = relationFieldMatch[2];
            const fieldsMatch = /fields:\s*\[\s*(['"]?)(.+?)\1\s*\]/.exec(relationParams);
            const referencesMatch = /references:\s*\[\s*(['"]?)(.+?)\1\s*\]/.exec(relationParams);
            if (fieldsMatch && referencesMatch) {
                const fields = fieldsMatch[2].split(',').map(f => f.trim());
                const references = referencesMatch[2].split(',').map(r => r.trim());
                relations[modelName].push({
                    model: references[0],
                    field: fields[0],
                });
            }
        }

        // Match array relations
        let arrayRelationMatch;
        while (arrayRelationMatch = arrayRelationRegex.exec(modelContent)) {
            const fieldName = arrayRelationMatch[1];
            const relatedModel = arrayRelationMatch[2];
            relations[modelName].push({
                model: relatedModel,
                field: modelName.toLowerCase() + '_id',
            });
        }
    }
    console.log('Generated relations:', relations);
    return relations;
}