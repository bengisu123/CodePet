import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

type PetCardProps = {
  name: string;
  species: string;
};

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${value}%`, backgroundColor: color }]} />
    </View>
  );
}

function PetCard({ name, species }: PetCardProps) {
  const [hunger, setHunger] = useState(60);
  const [happiness, setHappiness] = useState(50);
  const [energy, setEnergy] = useState(70);
  const [xp, setXp] = useState(0);

  const level = Math.floor(xp / 100) + 1;

  const feedPet = () => {
    setHunger((prev) => Math.max(0, prev - 15));
    setHappiness((prev) => Math.min(100, prev + 5));
    setEnergy((prev) => Math.min(100, prev + 5));
    setXp((prev) => prev + 20);
  };

  const playWithPet = () => {
    setHappiness((prev) => Math.min(100, prev + 15));
    setHunger((prev) => Math.min(100, prev + 10));
    setEnergy((prev) => Math.max(0, prev - 15));
    setXp((prev) => prev + 25);
  };

  const restPet = () => {
    setEnergy((prev) => Math.min(100, prev + 20));
    setHunger((prev) => Math.min(100, prev + 5));
    setXp((prev) => prev + 15);
  };

  const petEmoji = useMemo(() => {
    if (energy <= 20) return '😴';
    if (hunger >= 80) return '😿';
    if (happiness >= 80) return '😸';
    if (happiness <= 30) return '🥺';
    return '🐾';
  }, [energy, hunger, happiness]);

  const backgroundColor = useMemo(() => {
    if (energy <= 20) return '#E6EAF4';
    if (hunger >= 80) return '#FFE5E5';
    if (happiness >= 80) return '#E8FFF1';
    return '#FFF4E6';
  }, [energy, hunger, happiness]);

  const achievements = [
    xp >= 20 ? '🍽️ İlk Besleme' : null,
    xp >= 50 ? '🎉 Oyun Sever' : null,
    xp >= 100 ? '⭐ Level 2' : null,
    xp >= 200 ? '🏆 Usta Bakıcı' : null,
  ].filter(Boolean);

  return (
    <View style={[styles.screenWrapper, { backgroundColor }]}>
      <View style={styles.card}>
        <Text style={styles.emoji}>{petEmoji}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.species}>Tür: {species}</Text>

        <View style={styles.levelBox}>
          <Text style={styles.levelText}>Level: {level}</Text>
          <Text style={styles.levelText}>XP: {xp}</Text>
        </View>

        <View style={styles.statSection}>
          <Text style={styles.statLabel}>Açlık: {hunger}</Text>
          <ProgressBar value={100 - hunger} color="#FF9F68" />

          <Text style={styles.statLabel}>Mutluluk: {happiness}</Text>
          <ProgressBar value={happiness} color="#6EC6B8" />

          <Text style={styles.statLabel}>Enerji: {energy}</Text>
          <ProgressBar value={energy} color="#7A9DFF" />
        </View>

        <TouchableOpacity style={styles.button} onPress={feedPet}>
          <Text style={styles.buttonText}>Besle (+20 XP)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={playWithPet}>
          <Text style={styles.buttonText}>Oyna (+25 XP)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.thirdButton]} onPress={restPet}>
          <Text style={styles.buttonText}>Dinlendir (+15 XP)</Text>
        </TouchableOpacity>

        <View style={styles.achievementBox}>
          <Text style={styles.achievementTitle}>Rozetler</Text>
          {achievements.length > 0 ? (
            achievements.map((item, index) => (
              <Text key={index} style={styles.achievementText}>
                {item}
              </Text>
            ))
          ) : (
            <Text style={styles.achievementText}>Henüz rozet kazanılmadı.</Text>
          )}
        </View>
      </View>
    </View>
  );
}

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>CodePet</Text>
        <Text style={styles.subtitle}>Oyunlaştırılmış Dijital Evcil Hayvan</Text>

        <PetCard name="Mino" species="Kedi" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  screenWrapper: {
    borderRadius: 28,
    padding: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#5C3D2E',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 17,
    color: '#7A5C4D',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    elevation: 4,
  },
  emoji: {
    fontSize: 68,
    textAlign: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3A2E2A',
    textAlign: 'center',
  },
  species: {
    fontSize: 16,
    color: '#8B6F62',
    textAlign: 'center',
    marginBottom: 18,
  },
  levelBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF8F1',
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B3A33',
  },
  statSection: {
    marginBottom: 18,
  },
  statLabel: {
    fontSize: 15,
    color: '#4B3A33',
    marginBottom: 6,
    marginTop: 10,
  },
  progressTrack: {
    width: '100%',
    height: 12,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#FF9F68',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#6EC6B8',
  },
  thirdButton: {
    backgroundColor: '#7A9DFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  achievementBox: {
    marginTop: 20,
    backgroundColor: '#FFF8F1',
    borderRadius: 16,
    padding: 16,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B3A33',
    marginBottom: 10,
  },
  achievementText: {
    fontSize: 15,
    color: '#5C4A42',
    marginBottom: 6,
  },
});