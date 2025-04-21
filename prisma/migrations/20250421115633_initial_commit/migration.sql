-- CreateTable
CREATE TABLE "characters" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "characterName" TEXT NOT NULL,
    "race" VARCHAR(15) NOT NULL,
    "age" INTEGER NOT NULL DEFAULT 10,
    "imageUrl" TEXT NOT NULL,
    "primaryClass" TEXT NOT NULL,
    "primaryLevel" INTEGER NOT NULL DEFAULT 1,
    "secondaryClass" TEXT NOT NULL DEFAULT 'nenhuma',
    "secondaryLevel" INTEGER NOT NULL DEFAULT 0,
    "strength" INTEGER NOT NULL DEFAULT 10,
    "dexterity" INTEGER NOT NULL DEFAULT 10,
    "constitution" INTEGER NOT NULL DEFAULT 10,
    "intelligence" INTEGER NOT NULL DEFAULT 10,
    "wisdom" INTEGER NOT NULL DEFAULT 10,
    "charisma" INTEGER NOT NULL DEFAULT 10,
    "health" INTEGER NOT NULL DEFAULT 5,
    "tempHealth" INTEGER NOT NULL DEFAULT 0,
    "spellLevel" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Uma Arma elegante, para tempos mais Civilizados',
    "magicBonus" INTEGER NOT NULL DEFAULT 0,
    "damage" TEXT NOT NULL,
    "properties" TEXT NOT NULL DEFAULT 'Existe, e é isso',
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weapons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Inventory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "characters_characterName_key" ON "characters"("characterName");

-- CreateIndex
CREATE UNIQUE INDEX "_Inventory_AB_unique" ON "_Inventory"("A", "B");

-- CreateIndex
CREATE INDEX "_Inventory_B_index" ON "_Inventory"("B");

-- AddForeignKey
ALTER TABLE "_Inventory" ADD CONSTRAINT "_Inventory_A_fkey" FOREIGN KEY ("A") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Inventory" ADD CONSTRAINT "_Inventory_B_fkey" FOREIGN KEY ("B") REFERENCES "weapons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
