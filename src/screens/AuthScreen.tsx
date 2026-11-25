import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout, spacing } from '../theme/spacing';
import { Button } from '../components/common/Button';
import { PressableScale } from '../components/common/PressableScale';
import { useStore } from '../store/useStore';
import { ShieldCheck, Sparkles } from 'lucide-react-native';

interface AuthScreenProps {
  onSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess }) => {
  const { login } = useStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('Alexandra de Valois');
  const [email, setEmail] = useState('alexandra.valois@elera-atelier.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = () => {
    login(email, name);
    onSuccess();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[typography.campaignLabel, styles.tagline]}>
            MAISON DE HAUTE COUTURE
          </Text>
          <Text style={[typography.displayMedium, styles.brand]}>
            É L E R A
          </Text>
          <Text style={[typography.bodyMedium, styles.subtitle]}>
            Enter your private salon credentials for bespoke concierge and priority atelier reservation.
          </Text>
        </View>

        {/* Tab switch */}
        <View style={styles.tabSwitch}>
          <PressableScale
            onPress={() => setIsSignUp(false)}
            style={[styles.tab, !isSignUp && styles.tabActive]}
          >
            <Text
              style={[
                typography.buttonLabel,
                styles.tabText,
                !isSignUp && styles.tabTextActive,
              ]}
            >
              SIGN IN
            </Text>
          </PressableScale>

          <PressableScale
            onPress={() => setIsSignUp(true)}
            style={[styles.tab, isSignUp && styles.tabActive]}
          >
            <Text
              style={[
                typography.buttonLabel,
                styles.tabText,
                isSignUp && styles.tabTextActive,
              ]}
            >
              REGISTER
            </Text>
          </PressableScale>
        </View>

        {/* Form fields */}
        <View style={styles.form}>
          {isSignUp && (
            <View style={styles.inputGroup}>
              <Text style={[typography.campaignLabel, styles.inputLabel]}>
                FULL NAME
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Countess / Lord / Full Name"
                placeholderTextColor={colors.warmGrey}
                style={styles.input}
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={[typography.campaignLabel, styles.inputLabel]}>
              CLIENT EMAIL
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="client@elera-atelier.com"
              placeholderTextColor={colors.warmGrey}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[typography.campaignLabel, styles.inputLabel]}>
              CONFIDENTIAL PIN / CODE
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••••••"
              placeholderTextColor={colors.warmGrey}
              style={styles.input}
            />
          </View>

          <View style={styles.privilegeBadge}>
            <ShieldCheck size={16} color={colors.champagneGold} />
            <Text style={[typography.caption, styles.privilegeText]}>
              Encrypted VIP Client Session · Verified Concierge Protection
            </Text>
          </View>

          <Button
            title={isSignUp ? 'JOIN PRIVILÈGE ATELIER' : 'ACCÈS PRIVILÈGE'}
            onPress={handleSubmit}
            variant="primary"
            style={styles.submitBtn}
          />

          <PressableScale onPress={onSuccess} style={styles.guestBtn}>
            <Sparkles size={14} color={colors.dustyRose} />
            <Text style={[typography.buttonLabel, styles.guestText]}>
              EXPLORE AS GUEST
            </Text>
          </PressableScale>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearlIvory,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: 70,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  tagline: {
    color: colors.champagneGold,
    letterSpacing: 3,
    marginBottom: spacing.xs,
  },
  brand: {
    color: colors.midnightNavy,
    letterSpacing: 6,
    marginBottom: spacing.md,
  },
  subtitle: {
    color: colors.mutedPlum,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 300,
  },
  tabSwitch: {
    flexDirection: 'row',
    backgroundColor: colors.lightBlush,
    borderRadius: layout.chipRadius,
    padding: 3,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.blushBorder,
  },
  tab: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.chipRadius - 2,
  },
  tabActive: {
    backgroundColor: colors.midnightNavy,
  },
  tabText: {
    color: colors.mutedPlum,
  },
  tabTextActive: {
    color: colors.pureWhite,
  },
  form: {
    gap: spacing.base,
  },
  inputGroup: {
    gap: spacing.xs,
  },
  inputLabel: {
    color: colors.midnightNavy,
  },
  input: {
    height: 50,
    backgroundColor: colors.pureWhite,
    borderRadius: layout.buttonRadius,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    paddingHorizontal: spacing.base,
    fontFamily: typography.bodyMedium.fontFamily,
    fontSize: 14,
    color: colors.midnightNavy,
  },
  privilegeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.lightBlush,
    padding: spacing.md,
    borderRadius: layout.buttonRadius,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    marginVertical: spacing.xs,
  },
  privilegeText: {
    color: colors.midnightNavy,
    flex: 1,
    fontSize: 11,
  },
  submitBtn: {
    marginTop: spacing.sm,
    height: 54,
  },
  guestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
  },
  guestText: {
    color: colors.dustyRose,
  },
});
